import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GovernmentHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Government Logo and Branding */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {/* Ashoka Chakra Logo Placeholder */}
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-6 bg-white"></div>
                    <div className="w-6 h-1 bg-white absolute"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-blue-900 font-bold text-lg">M</span>
                  <span className="text-blue-900 font-bold text-lg bg-blue-900 text-white px-1">C</span>
                  <span className="text-blue-900 font-bold text-lg bg-blue-900 text-white px-1">A</span>
                </div>
                <div className="text-xs text-blue-900 font-medium mt-1">
                  MINISTRY OF<br />
                  <span className="font-bold">CORPORATE</span><br />
                  <span className="font-bold">AFFAIRS</span>
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  GOVERNMENT OF INDIA
                </div>
              </div>
            </div>

            <div className="border-l border-gray-300 pl-6">
              <div className="text-blue-900 font-semibold text-lg">NITI MANTHAN</div>
              <div className="text-blue-700 text-sm">
                EMPOWERING POLICY, PROTECTING CITIZENS
              </div>
              <div className="flex space-x-4 text-xs text-blue-600 mt-1">
                <span className="font-medium text-orange-500">REGULATOR</span>
                <span>•</span>
                <span className="font-medium text-blue-600">INTEGRATOR</span>
                <span>•</span>
                <span className="font-medium text-green-600">FACILITATOR</span>
                <span>•</span>
                <span className="font-medium text-purple-600">EDUCATOR</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search policies, drafts, and comments..."
                className="pl-10 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-blue-900 border-blue-900 hover:bg-blue-50">
              हिंदी
            </Button>
            <Button variant="outline" size="sm" className="text-blue-900 border-blue-900 hover:bg-blue-50">
              Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentHeader;