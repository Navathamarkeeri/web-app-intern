import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UploadAreaProps {
  onUploadSuccess?: (resume: any) => void;
}

export default function ResumeUploadArea({ onUploadSuccess }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', 'default-user');

      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Resume uploaded successfully!",
        description: `Your resume has been analyzed with a score of ${data.analysis.score}%`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
      onUploadSuccess?.(data);
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      handleFileUpload(pdfFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    uploadMutation.mutate(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragOver 
            ? "border-primary bg-primary/5" 
            : uploadMutation.isPending
            ? "border-muted-foreground bg-muted/50"
            : "border-border hover:border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        data-testid="area-file-upload"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileSelect}
          data-testid="input-file"
        />
        
        {uploadMutation.isPending ? (
          <>
            <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
            <p className="text-lg font-medium text-foreground mb-2">Analyzing your resume...</p>
            <p className="text-muted-foreground">This may take a few moments</p>
          </>
        ) : (
          <>
            <i className="fas fa-cloud-upload-alt text-4xl text-muted-foreground mb-4"></i>
            <p className="text-lg font-medium text-foreground mb-2">Drag & drop your resume here</p>
            <p className="text-muted-foreground mb-4">or click to browse files</p>
            <p className="text-sm text-muted-foreground">Supports PDF files up to 10MB</p>
          </>
        )}
      </div>
      
      {uploadedFile && !uploadMutation.isPending && (
        <div className="bg-card border border-border rounded-lg p-4" data-testid="status-uploaded-file">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <i className="fas fa-file-pdf text-red-500"></i>
              <span className="font-medium" data-testid="text-filename">{uploadedFile.name}</span>
            </div>
            <span className="text-sm text-green-600 font-medium">
              <i className="fas fa-check mr-1"></i>
              Uploaded
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB • Uploaded just now
          </div>
        </div>
      )}
    </div>
  );
}
