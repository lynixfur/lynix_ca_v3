import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { useRouter } from 'next/router';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // Router NextJS
  const router = useRouter();
  const { nfc } = router.query;


  const [isSSA, setIsSSA] = useState(false);
  const [mainKernelPanic, setMainKernelPanic] = useState(false);
  const [ssaKernelPanic, setSSAKernelPanic] = useState(false);

  const nfcDatabase: any = [
    {
      "id": "5a700528-c487-40e6-826f-b4153b309d89",
      "event": "Lynix's Wallet Card"
    }
  ];
  
  // Check NFC Database
  if (nfc) {
    const nfcData = nfcDatabase.find((nfcData: any) => nfcData.id === nfc);
    if (nfcData) {
      console.log(nfcData.event);
      //router.push(`/nfc/${nfcData.event}`);
    }
  }

  const setPanicMainSite = async () => {
    setMainKernelPanic(true);
    // Wait 5 seconds
    await new Promise(r => setTimeout(r, 3000));
    // Reset panic
    setMainKernelPanic(false);
  }

  const setSSA = async () => {
    setIsSSA(true);
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center sm:justify-center justify-left p-5 sm:p-24">
      {!nfc && <>
      {!isSSA && <pre className="w-full" style={{"fontFamily": "monospace"}}>&gt; lynix_cli --api:api.lynix.ca --allow-site-options{"\n"}
      {"\n"}Welcome to
      {"\n"}{"  "}_{"             "}_{"                      "}{"\n"} | |{"           "}(_){"                     "}{"\n"} | |_{"   "}_ _ __{"  "}___{"  "}__{"       "}___ __ _ {"\n"} | | | | | '_ \| \ \/ /{"      "}/ __/ _` |{"\n"} | | |_| | | | | |&gt;{"  "}&lt;{"   "}_{"  "}| (_| (_| |{"\n"} |_|\__, |_| |_|_/_/\_\ (_){"  "}\___\__,_|{"\n"}{"     "}__/ |{"                             "}{"\n"}{"    "}|___/{"              "}{"\n"}
      {mainKernelPanic && <>
      {"\n"}<span className="text-red-600">[KERNEL PANIC] We could not connect you to the lynix.ca website!</span>{"\n"}
      </>}
      {"\n"}Choose an option: {"\n"}
      {"\n"}<span className="hover:bg-gray-100 hover:text-black cursor-pointer" onClick={() => {setPanicMainSite()}}>1. Continue to Site</span>
      {"\n"}<span className="hover:bg-gray-100 hover:text-black cursor-pointer" onClick={() => {setSSA()}}>2. Enter Super Secret Area (Pin Required)</span>
      {"\n"}
      {"\n"}Home of all things infosec, programming and weird experiments.
      {"\n"}If you'd like to get in touch with Lynix, send an email to lynix@lynix.ca
      {"\n"}
      </pre>}

      {isSSA && 
        <pre className="w-full"  style={{"fontFamily": "monospace"}}>&gt; lynix_cli --ssa{"\n"}{"\n"}Welcome to the{"\n"}{"   "}_____{"                          "}_____{"                    "}_{"                             "}{"\n"}{"  "}/ ____|{"                        "}/ ____|{"                  "}| |{"       "}/\{"                   "}{"\n"} | (___{"  "}_{"   "}_ _ __{"   "}___ _ __{"  "}| (___{"   "}___{"  "}___ _ __ ___| |_{"     "}/{"  "}\{"   "}_ __ ___{"  "}__ _ {"\n"}{"  "}\___ \| | | | '_ \ / _ \ '__|{"  "}\___ \ / _ \/ __| '__/ _ \ __|{"   "}/ /\ \ | '__/ _ \/ _` |{"\n"}{"  "}____) | |_| | |_) |{"  "}__/ |{"     "}____) |{"  "}__/ (__| | |{"  "}__/ |_{"   "}/ ____ \| | |{"  "}__/ (_| |{"\n"} |_____/ \__,_| .__/ \___|_|{"    "}|_____/ \___|\___|_|{"  "}\___|\__| /_/{"    "}\_\_|{"  "}\___|\__,_|{"\n"}{"              "}| |{"                                                                        "}{"\n"}{"              "}|_|{"                                                                       "}{"\n"}
        {ssaKernelPanic && <>
        {"\n"}<span className="text-red-600">[KERNEL PANIC] Failed to authenticate with Lynix API, Connection Refused!</span>{"\n"}
        </>}
        {"\n"}You must enter the pincode provided to you:{"\n"}
        {"\n"}<span>[</span><input id="pin" name="pin" type="password" className="bg-black focus:outline-0"></input><span>]</span>
        {"\n"}
        {"\n"}<span className="hover:bg-gray-100 hover:text-black cursor-pointer" onClick={() => {setSSAKernelPanic(true)}}>[Done]</span>
        {"\n"}</pre>
      }
      </>}
    </main>
  )
}
