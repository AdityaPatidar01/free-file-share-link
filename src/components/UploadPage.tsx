
import React, { useState, useCallback } from 'react';
import { Upload, Copy, Check, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    
    try {
      // Simulate API call - replace with actual backend call
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock share code
      const mockCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setShareCode(mockCode);
      
      toast({
        title: "Upload Successful!",
        description: "Your file has been uploaded and is ready to share.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Share code copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const resetUpload = () => {
    setFile(null);
    setShareCode('');
    setCopied(false);
  };

  if (shareCode) {
    return (
      <div className="space-y-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                File Uploaded Successfully!
              </h3>
              <p className="text-green-700 mb-4">
                Share this code with the recipient:
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  value={shareCode}
                  readOnly
                  className="text-center text-2xl font-mono font-bold"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  className={copied ? "bg-green-100 border-green-300" : ""}
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-green-600 mb-4">
                File: {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)
              </p>
              <Button onClick={resetUpload} variant="outline" className="w-full">
                Upload Another File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-400 bg-blue-50"
              : "border-white/30 hover:border-white/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-white/70 mx-auto mb-4" />
          <p className="text-lg text-white mb-2">
            Drag and drop your file here
          </p>
          <p className="text-white/70 mb-4">or</p>
          <label htmlFor="file-upload">
            <Button asChild variant="secondary">
              <span className="cursor-pointer">Choose File</span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="*/*"
          />
          <p className="text-xs text-white/60 mt-4">
            Maximum file size: 100MB
          </p>
        </div>
      ) : (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 mb-4">
              <File className="h-8 w-8 text-blue-400" />
              <div className="flex-1">
                <p className="font-medium text-white">{file.name}</p>
                <p className="text-sm text-white/70">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </>
                )}
              </Button>
              <Button
                onClick={resetUpload}
                variant="outline"
                disabled={uploading}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadPage;
