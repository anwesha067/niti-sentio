import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Database, FileSpreadsheet, FileJson } from "lucide-react";

const ExportAnalyticsPage = () => {
  const handleExport = (format: string) => {
    // Mock data export
    let data = "";
    let filename = "";
    let mimeType = "";

    switch (format) {
      case 'csv':
        data = `Draft Title,Total Comments,Positive %,Negative %,Neutral %,Status
"Draft Digital Personal Data Protection Rules 2025",15284,45,30,25,Active
"Draft Consumer Protection (E-commerce) Amendment Rules 2025",8962,38,42,20,Active
"Draft Companies (Corporate Social Responsibility) Rules 2025",3456,52,28,20,"Review Complete"`;
        filename = 'analytics-export.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
        data = JSON.stringify({
          exportedAt: new Date().toISOString(),
          totalComments: 27702,
          drafts: [
            {
              id: 1,
              title: "Draft Digital Personal Data Protection Rules 2025",
              totalComments: 15284,
              sentiment: { positive: 45, negative: 30, neutral: 25 }
            },
            {
              id: 2,
              title: "Draft Consumer Protection (E-commerce) Amendment Rules 2025",
              totalComments: 8962,
              sentiment: { positive: 38, negative: 42, neutral: 20 }
            }
          ]
        }, null, 2);
        filename = 'analytics-export.json';
        mimeType = 'application/json';
        break;
      default:
        return;
    }

    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Export Analytics</h1>
          <p className="text-muted-foreground">
            Export analytical data in various formats for external analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <span>CSV Export</span>
              </CardTitle>
              <CardDescription>
                Structured data for spreadsheet analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• Draft-wise comment statistics</p>
                <p>• Sentiment breakdowns</p>
                <p>• Keyword frequency data</p>
                <p>• Compatible with Excel/Google Sheets</p>
              </div>
              <Button onClick={() => handleExport('csv')} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export as CSV
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileJson className="h-5 w-5 text-blue-600" />
                <span>JSON Export</span>
              </CardTitle>
              <CardDescription>
                Raw data for programmatic analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• Complete analytical dataset</p>
                <p>• Hierarchical data structure</p>
                <p>• API-ready format</p>
                <p>• Perfect for data scientists</p>
              </div>
              <Button onClick={() => handleExport('json')} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export as JSON
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-purple-600" />
                <span>Database Dump</span>
              </CardTitle>
              <CardDescription>
                Complete database export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• Full comment dataset</p>
                <p>• Raw and processed data</p>
                <p>• Includes metadata</p>
                <p>• For advanced analytics</p>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Request DB Export
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Export History</CardTitle>
            <CardDescription>Recent data exports and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "All Drafts Analytics", format: "CSV", date: "1 hour ago", size: "145 KB", status: "Completed" },
                { name: "DPDP Rules Comments", format: "JSON", date: "3 hours ago", size: "2.1 MB", status: "Completed" },
                { name: "Sentiment Analysis Data", format: "CSV", date: "1 day ago", size: "867 KB", status: "Completed" },
                { name: "Full Database Export", format: "SQL", date: "2 days ago", size: "15.2 MB", status: "Processing" }
              ].map((export_item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-foreground">{export_item.name}</p>
                      <Badge variant="secondary">{export_item.format}</Badge>
                      <Badge 
                        variant={export_item.status === "Completed" ? "default" : "outline"}
                        className={export_item.status === "Processing" ? "text-orange-600" : ""}
                      >
                        {export_item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{export_item.date} • {export_item.size}</p>
                  </div>
                  {export_item.status === "Completed" && (
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportAnalyticsPage;