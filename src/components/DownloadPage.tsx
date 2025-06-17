
import React, { useState } from 'react';
import { Download, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const DownloadPage = () => {
  const [shareCode, setShareCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    uploadDate: string;
  } | null>(null);

  const { toast } = useToast();

  const handleSearch = async () => {
    if (!shareCode.trim()) {
      toast({
        title: "Enter Share Code",
        description: "Please enter a valid share code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call to check file existence
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock file info - replace with actual backend call
      setFileInfo({
        name: "sample-document.pdf",
        size: 2.5 * 1024 * 1024, // 2.5 MB
        uploadDate: new Date().toLocaleDateString(),
      });
      
      toast({
        title: "File Found!",
        description: "Click download to get your file.",
      });
    } catch (error) {
      toast({
        title: "File Not Found",
        description: "The share code you entered is invalid or expired.",
        variant: "destructive",
      });
      setFileInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!fileInfo) return;

    try {
      // Simulate download - replace with actual backend call
      toast({
        title: "Download Started",
        description: "Your file download has begun.",
      });
      
      // Create a mock download
      const link = document.createElement('a');
      link.href = '#';
      link.download = fileInfo.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the file.",
        variant: "destructive",
      });
    }
  };

  const resetSearch = () => {
    setShareCode('');
    setFileInfo(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter share code (e.g., ABC123)"
            value={shareCode}
            onChange={(e) => setShareCode(e.target.value.toUpperCase())}
            className="text-center font-mono text-lg"
            maxLength={6}
          />
          <Button
            onClick={handleSearch}
            disabled={loading || !shareCode.trim()}
            size="icon"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <p className="text-xs text-white/60 text-center">
          Enter the 6-character code shared with you
        </p>
      </div>

      {fileInfo && (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {fileInfo.name}
              </h3>
              <div className="text-sm text-white/70 mb-6 space-y-1">
                <p>Size: {(fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
                <p>Uploaded: {fileInfo.uploadDate}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
                <Button
                  onClick={resetSearch}
                  variant="outline"
                >
                  New Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!fileInfo && shareCode && !loading && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-yellow-800 text-center">
              Click the search button to look for your file
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DownloadPage;
