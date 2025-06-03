import { Map, MapMarker} from "react-kakao-maps-sdk"
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import logo from '../../assets/logo.png'
import marker from '../../assets/marker.png'
import Button from "../../components/button/Button";

function Mappage() {
  const [location, setLocation] = useState({ 
    lat: 33,
    lng: 127
  });

  useEffect(() => {

    //파이어베이스 연결
    const firebaseConfig = {
      databaseURL: "https://esp32-b954f-default-rtdb.asia-southeast1.firebasedatabase.app",
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const locationRef = ref(database, 'location');

    //실시간 위치 업데이트
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      // console.log('새로운 위치 데이터:', data); //테스트
      if (data) {
        setLocation({
          lat: data.lat,
          lng: data.lng
        });
      }
    });

    const kakao = window.kakao;
    kakao.maps.load(() => {
    });
  }, []);

 return (
   <div className="max-w-xl min-h-screen mx-auto bg-gray-50">
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
       </Map>
       <div className="absolute z-10 top-2 ">
         <div className="flex items-center justify-between px-4 py-2">
           <img src={logo} className="h-14" alt="INU Broong" />
         </div>
       </div>
       <div className="absolute z-10 bottom-6 right-6">
         <Button />
       </div>
     </div>
   </div>
 );
}

export default Mappage