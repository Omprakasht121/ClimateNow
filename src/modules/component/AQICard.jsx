import { Loader2 } from "lucide-react";
import { calculateIndianAQI } from "../services/indianAqiCalculator";
import { getAQICategory } from "../utils/aqiUtils";


const AQICard = ({aqiData, loading,}) => {

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

const components = aqiData.list[0].components;
const indianAQI = calculateIndianAQI(components);

const aqiStatus = getAQICategory(indianAQI)




  return (
    
    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl min-h-[300px] md:h-96 flex flex-col justify-between">
     
      <div>
        <h2 className="text-xl font-semibold text-slate-400 mb-6">
          Air Quality Index
        </h2>

        <div className="flex items-end gap-4">
          <span className="text-8xl font-bold">{indianAQI}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${aqiStatus.color} `}>
            {aqiStatus.text}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${aqiStatus.color}`}
            style={{ width: `${(indianAQI / 200) * 100}%` }}
          />
        </div>
        <p className="text-slate-400 text-sm italic mt-4">
          {aqiStatus.msg}
        </p>
      </div>
    </div>
  );
};

export default AQICard;
