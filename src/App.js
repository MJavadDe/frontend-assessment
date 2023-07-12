import { useEffect, useState } from "react";
import Service from "./components/service";
import logo from "./logo.svg";
import { SaveIcon } from "./components/icons/save";
import { ShareIcon } from "./components/icons/share";
import {ViewIcon} from './components/icons/view'
import { Avatar } from "./components/Avavtar";
import { LikeIcon } from "./components/icons/like";
import { TrustIcon } from "./components/icons/trust";

const App = () => {
  const [data, setData] = useState(null);
  const [saveFill, setSaveFill] = useState(false)

  const changeSaveFill = () => setSaveFill(prev => !prev)

  const numberFormatter = (num) =>{
    return num >= 1000 ? (num / 1000).toFixed() + "K" : num
  }

  const shareWindow = async () =>{
    let pageUrl = {
      url:window.location.href
    }
    await navigator.share(pageUrl)
  }
  document.title = data?.name +" "+ data?.family


  useEffect(() => {
    fetch("/profile.json")
      .then((response) => response.json())
      .then((data) => setData(data));
    //   Return Data:
    //   name,
    //   family,
    //   image,
    //   viewCount,
    //   isBookmarked,
    //   profileUrl,
    //   expertise,
    //   satisfaction,
    //   commentsCount,
    //   waitingTime
  }, []);

  if (!data) return null;
  return (
    <div className="h-screen bg-slate-100">
      <header className="flex h-16 bg-white opacity-60">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" />
            <div className="w-20 h-3 rounded-full bg-slate-100" />
          </div>
          <nav className="flex gap-5">
            <div className="w-20 h-3 rounded-full bg-slate-100" />
            <div className="w-20 h-3 rounded-full bg-slate-100" />
            <div className="w-20 h-3 rounded-full bg-slate-100" />
          </nav>
          <div className="rounded-md w-28 h-9 bg-slate-100" />
        </div>
      </header>
      <main className="container grid grid-cols-3 pt-10 mx-auto gap-7">
        <div className="flex flex-col col-span-2 gap-5">
          <div className="h-56 bg-white rounded-lg bg-opacity-60 flex flex-col p-4 gap-4">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="flex items-center cursor-pointer gap-1" onClick={changeSaveFill}><SaveIcon fill={saveFill}/> <span>Save<span className={saveFill?"inline":"hidden"}>d</span></span></div>
                <div className="flex items-center cursor-pointer gap-1" onClick={shareWindow}><ShareIcon/> <span>Share</span></div>
              </div>
              <div className="flex items-center"><ViewIcon/> <span>{numberFormatter(data?.viewCount)}</span></div>
            </div>
            <div className="bg-slate-100 flex items-center gap-3 rounded-md px-2">
              <div>
                <Avatar src={data?.image}/>
              </div>
              <div>
                <h3 className="font-bold flex items-center gap-2">{data?.name + " " + data?.family} <span className={data?.satisfaction >= 90 && data?.commentsCount >= 100 && data?.waitingTime == 1 ? "inline" : "hidden"}> <TrustIcon/></span></h3>
                <p>{data?.expertise}</p>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-2 justify-center">
                <span className="flex items-center py-1 px-4 bg-green-700 text-white rounded-3xl gap-1">
                  <LikeIcon/> {data?.satisfaction + "%"}
                </span>
                Satisfaction ({data?.commentsCount +" " + "Comments"})
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg h-96 bg-opacity-60">
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-lg bg-opacity-60 h-52">
          </div>
            <Service waitingTime={data?.waitingTime} />
        </div>
      </main>
    </div>
  );
};

export default App;
