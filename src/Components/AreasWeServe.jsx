import { MapContainer, useMap, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet'
import { useRef, useEffect, useState } from "react";
import tileLayer from './tileLayer';
import 'leaflet/dist/leaflet.css'
import MarkerImage from '../assets/images/marker-icon-2x.png'

const center = [23.0337976, 72.5595009];
const points = [
    {
        lat: 23.022125,
        lng: 72.543132,
        title: 'Ambawadi'
    },
    {
        lat: 23.007954,
        lng: 72.627931,
        title: 'Amraiwadi'
    },
    {
        lat: 23.048912,
        lng: 72.608227,
        title: 'Asarwa'
    },
    {
        lat: 23.072950,
        lng: 72.885563,
        title: 'Bahiyal'
    },
    {
        lat: 23.038561,
        lng: 72.630823,
        title: 'Bapunagar'
    },
    {
        lat: 23.004473,
        lng: 72.580313,
        title: 'Behrampura'
    },
    {
        lat: 23.033436,
        lng: 72.465015,
        title: 'Bopal'
    },


    {
        lat: 23.1146032,
        lng: 72.5737087,
        title: 'Chandkheda'
    },
    {
        lat: 23.0914295,
        lng: 72.5470921,
        title: 'Chandlodiya'
    },
    {
        lat: 22.9741751,
        lng: 72.5160389,
        title: 'Chaloda'
    },
    {
        lat: 23.1659328,
        lng: 72.7454517,
        title: 'Dabhoda'
    },
    {
        lat: 23.0340655,
        lng: 72.5936713,
        title: 'Dariapur'
    },
    {
        lat: 23.076822,
        lng: 72.5360618,
        title: 'Ghatlodiya'
    },
    {
        lat: 23.02752,
        lng: 72.59578,
        title: 'Ghodasar'
    },
    {
        lat: 23.0474276,
        lng: 72.5983255,
        title: 'Girdharnagar'
    },
    {
        lat: 23.0181492,
        lng: 72.6121521,
        title: 'Gomtipur'
    },
    {
        lat: 23.1022693,
        lng: 72.5411829,
        title: 'Gota'
    },
    {
        lat: 22.976972,
        lng: 72.595592,
        title: 'Isanpur'
    },
    {
        lat: 23.0129043,
        lng: 72.5848001,
        title: 'Jamalpur'
    },
    {
        lat: 23.0231,
        lng: 72.60495,
        title: 'Jawahar Chowk'
    },
    {
        lat: 23.01995,
        lng: 72.5981,
        title: 'Jodhpur'
    },
    {
        lat: 23.01995,
        lng: 72.59125,
        title: 'Juhapura'
    },
    {
        lat: 23.0300852,
        lng: 72.5966223,
        title: 'Kalupur'
    },
    {
        lat: 23.0219068,
        lng: 72.5944126,
        title: 'Khadia'
    },
    {
        lat: 23.0837343,
        lng: 72.574445,
        title: 'Khodiyarnagar'
    },
    {
        lat: 23.0231,
        lng: 72.60495,
        title: 'Khokhra'
    },
    {
        lat: 22.994117,
        lng: 72.507622,
        title: 'Makarba'
    },
    {
        lat: 23.0231,
        lng: 72.60495,
        title: 'Maninagar'
    },
    {
        lat: 23.051848,
        lng: 72.537201,
        title: 'Memnagar'
    },
    {
        lat: 23.06682,
        lng: 72.74225,
        title: 'Mithakali'
    },
    {
        lat: 23.0941727,
        lng: 72.5961051,
        title: 'Motera'
    },
    {
        lat: 23.0690095,
        lng: 72.6801516,
        title: 'Naroda'
    },
    {
        lat: 23.02347,
        lng: 72.58988,
        title: 'Nava Vadaj'
    },
    {
        lat: 23.0409406,
        lng: 72.558921,
        title: 'Navrangpura'
    },
    {
        lat: 23.0215858,
        lng: 72.6683283,
        title: 'Odhav'
    },
    {
        lat: 23.0095929,
        lng: 72.5618844,
        title: 'Paldi'
    },
    {
        lat: 23.01596,
        lng: 72.61887,
        title: 'Rajpur Gomtipur'
    },
    {
        lat: 23.22449,
        lng: 72.65361,
        title: 'Ramol'
    },
    {
        lat: 23.0774981,
        lng: 72.5766709,
        title: 'Ranip'
    },
    {
        lat: 23.0954497,
        lng: 72.5825813,
        title: 'Sabarmati (area)'
    },
    {
        lat: 23.0296701,
        lng: 72.6121521,
        title: 'Saraspur'
    },
    {
        lat: 22.978852,
        lng: 72.490367,
        title: 'Sarkhej'
    },
    {
        lat: 23.0564687,
        lng: 72.5944106,
        title: 'Shahibaug'
    },
    {
        lat: 23.0362451,
        lng: 72.5811047,
        title: 'Shahpur'
    },
    {
        lat: 23.010672,
        lng: 72.5522667,
        title: 'Shardanagar'
    },
    {
        lat: 23.0652164,
        lng: 72.550787,
        title: 'Shastri Nagar'
    },
    {
        lat: 23.0623,
        lng: 72.5853,
        title: 'Subhash Bridge'
    },
    {
        lat: 23.0026296,
        lng: 72.5766649,
        title: 'Sukhrampura'
    },
    {
        lat: 23.0465,
        lng: 72.6462,
        title: 'Thakkarbapa Nagar'
    },
    {
        lat: 23.067417,
        lng: 72.512093,
        title: 'Thaltej'
    },
    {
        lat: 23.0470,
        lng: 72.5704,
        title: 'Usmanpura'
    },
    {
        lat: 23.00425,
        lng: 72.69075,
        title: 'Vastral'
    },
    {
        lat: 23.035007,
        lng: 72.529324,
        title: 'Vastrapur'
    },
    {
        lat: 22.9696,
        lng: 72.51915,
        title: 'Vejalpur'
    }
]

const pointerIcon = new L.Icon({
    iconUrl: MarkerImage,
    iconSize: [22, 35],
    iconAnchor: [20, 58],
    popupAnchor: [0, -60],
  });


const ListMarkers = ({ onItemClick }) => {
    return (
        <div className='mx-4 flex flex-row gap-4 flex-wrap text-[#455a64] mt-4 md:mt-8'>
            {points.map(({ title }, index) => (
                <div className='flex flex-row cursor-pointer select-none font-semibold'
                    key={index}
                    onClick={(e) => {
                        e.preventDefault();
                        onItemClick(index);
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#455a64" className="w-5 h-5">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    {title}
                </div>

            ))}
        </div>
    );
};


const MyMarkers = ({ data, selectedIndex }) => {
    return data.map((item, index) => (
        <PointMarker
            key={index}
            content={item.title}
            center={{ lat: item.lat, lng: item.lng }}
            openPopup={selectedIndex === index}
        />
    ));
}

const PointMarker = ({ center, content, openPopup }) => {
    const map = useMap();
    const markerRef = useRef(null);

    useEffect(() => {
        if (openPopup) {
            map.flyToBounds([center]);
            markerRef.current.openPopup();
        }
    }, [map, center, openPopup]);

    return (
        <Marker icon={pointerIcon} ref={markerRef} position={center}>
            <Popup>{content}</Popup>
        </Marker>
    );
}

const AreasWeServe = () => {

    const [selected, setSelected] = useState();
    function handleItemClick(index) {
        setSelected(index);
    }

    return (
        <>
            <div className='max-w-screen-xl mx-auto'>
                <h2 className="text-center text-[18px] font-bold text-gray-800 lg:text-[26px] mt-4 md:mb-4">Areas we serve  </h2>

                <div className='mx-4'>
                    <MapContainer zoom={11} style={{ height: '500px', width: '100%', zIndex: 0 }} center={center} scrollWheelZoom={false}>
                        <TileLayer {...tileLayer} />
                        <MyMarkers selectedIndex={selected} data={points} />
                    </MapContainer>
                </div>
                <ListMarkers data={points} onItemClick={handleItemClick} />
            </div>
        </>
    )
}

export default AreasWeServe