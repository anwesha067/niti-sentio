import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BarChart3 } from "lucide-react";

const GenerateReportPage = () => {
  const handleDownloadReport = () => {
    // Mock report generation
    const reportData = `
NITI MANTHAN - POLICY ANALYSIS REPORT
Generated on: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
===============
Total Comments Analyzed: 27,702
Overall Sentiment Distribution:
- Positive: 45%
- Negative: 30% 
- Neutral: 25%

TOP CONCERNS
============
1. Data Localization Requirements (mentioned in 2,847 comments)
2. Compliance Cost Impact (mentioned in 2,156 comments)
3. Implementation Timeline (mentioned in 1,923 comments)

RECOMMENDATIONS
===============
1. Consider phased implementation approach
2. Provide clearer guidelines on compliance requirements
3. Address concerns about cross-border data transfer

For detailed analysis, please contact the analytics team.
    `;
    
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policy-analysis-report.txt';
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Generate Report</h1>
          <p className="text-muted-foreground">
            Create comprehensive analysis reports for policy drafts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Quick Report</span>
              </CardTitle>
              <CardDescription>
                Generate a standard analysis report for all active drafts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• Executive summary of key findings</p>
                <p>• Sentiment analysis breakdown</p>
                <p>• Top keywords and concerns</p>
                <p>• Recommendations for policy makers</p>
              </div>
              <Button onClick={handleDownloadReport} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                <span>Custom Report</span>
              </CardTitle>
              <CardDescription>
                Create a customized report with specific parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>• Select specific draft legislations</p>
                <p>• Choose date ranges</p>
                <p>• Custom sentiment filters</p>
                <p>• Clause-specific analysis</p>
              </div>
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Configure Custom Report
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Previously generated analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "DPDP Rules 2025 - Comprehensive Analysis", date: "2 hours ago", size: "2.4 MB" },
                  { name: "E-commerce Amendment Rules - Weekly Summary", date: "1 day ago", size: "1.8 MB" },
                  { name: "CSR Rules 2025 - Final Report", date: "3 days ago", size: "3.1 MB" }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportPage;