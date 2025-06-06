import { Map, MapMarker,Polyline} from "react-kakao-maps-sdk"
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from "firebase/database";
import logo from '../../assets/logo.png'
import marker from '../../assets/marker.png'
import Button from "../../components/button/Button";
import SkeletonUI from "../../components/skeleton/Skeleton";
import Toast from "../../components/toast/Toast";

function Mappage() {
  const [location, setLocation] = useState({ 
    lat: 33,
    lng: 127
  });
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDatabase] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);

const handleBuzzerClick = async () => {
  try {
    if (!database) return;
    const buzzerRef = ref(database, 'buzzer');
    await set(buzzerRef, 1);

    setShowToast(true);
    // 토스트 메시지가 완전히 보여진 후 사라지도록 시간 조정
    setTimeout(() => setShowToast(false), 3000);
    
    setTimeout(async () => {
      await set(buzzerRef, 0);
    }, 10000);
  } catch (error) {
    console.error('부저 설정 중 오류 발생:', error);
  }
};

//타임라인
const handleTimelineClick = async () => {
  setShowTimeline(!showTimeline);
  
  if (!database) return;
  const locationsRef = ref(database, 'locations');
  
  // locations 데이터 가져오기
  onValue(locationsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const paths = Object.values(data)
        .slice(-100) // 최근 100개만 가져오기
        .map(location => ({
          lat: location.lat,
          lng: location.lng
        }));
      
      setTimelineData(paths);
    }
  });
};

  useEffect(() => {

    //파이어베이스 연결
    const firebaseConfig = {
      databaseURL: "https://esp32-b954f-default-rtdb.asia-southeast1.firebasedatabase.app",
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    setDatabase(database);
    const locationRef = ref(database, 'location');

    //실시간 위치 업데이트
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      setIsLoading(false);
      if (data) {
        setLocation({
          lat: data.lat,
          lng: data.lng
        });
      }
    }, (error) => {
      setIsLoading(true);
      console.error(error);
    });

    const kakao = window.kakao;
    kakao.maps.load(() => {
    });
  }, []);

    if (isLoading) {
    return <SkeletonUI />;
  }

 return (
   <div className="relative max-w-md min-h-screen mx-auto bg-gray-50">
     <Toast
       message={
         "브룽의 벨이 울렸습니다 \n 주변에서 벨이 울리는 브룽을 찾아보세요"
       }
       isVisible={showToast}
     />
     <div className="relative p-2">
       <Map
         center={location}
         className="w-full rounded-xl h-[calc(100vh-20px)]"
         level={2}
       >
         <MapMarker
           position={location}
           image={{
             src: marker,
             size: {
               width: 40,
               height: 40,
             },
             options: {
               offset: {
                 x: 20,
                 y: 20,
               },
             },
           }}
         />
         {showTimeline && (
           <Polyline
             path={timelineData}
             strokeWeight={4}
             strokeColor="blue"
             strokeOpacity={0.5}
             strokeStyle="solid"
           />
         )}
       </Map>
       <div className="absolute z-10 top-2 ">
         <div className="flex items-center justify-between px-4 py-2">
           <img src={logo} className="h-14" alt="INU Broong" />
         </div>
       </div>

       <div className="absolute left-0 right-0 z-10 px-4 bottom-6">
         <div className="flex gap-4">
           <Button onClick={handleBuzzerClick}>벨 울리기</Button>
           <Button onClick={handleTimelineClick}>
             {showTimeline ? "타임라인 숨기기" : "타임라인"}
           </Button>
         </div>
       </div>
     </div>
   </div>
 );
}

export default Mappage