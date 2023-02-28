import { useEffect, useState } from "react";
import type { Contract } from "ethers";
import { useAccount, useContract, useProvider } from "wagmi";
import Image from "next/image";
import contracts from "../../const/abi.json";

export default function Slot() {
  const { address, isConnected } = useAccount();
  const [approveState, setApproveState] = useState<boolean>(false);
  const provider = useProvider();

  const tokenContract: Contract | null = useContract({
    address: contracts.tokenContract.address,
    abi: contracts.tokenContract.abi,
    signerOrProvider: provider,
  });

  const [wager, setWager] = useState<number>(0);
  const [multiBets, setMultiBets] = useState<number>(1);
  const [stopGain, setStopGain] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [totalWager, setTotalWager] = useState<number>(0);

  useEffect(() => {
    getApproveAmount();
  }, []);

  const getApproveAmount = async () => {
    console.log(address);
    console.log(tokenContract);
    const allowance = Number(
      await tokenContract!.allowance(address, contracts.slotContract.address)
    );
    console.log("allownce = ", allowance);
    
    if(allowance >= totalWager){
      setApproveState(true);
    } else setApproveState(false);
  };

  const ApproveClick = async() => {
    
  }

  return (
    <div>
      <h1 className="text-center mt-5 text-[40px] tracking-[.25em] font-Space-Grotesk text-[#d7a85c] font-bold">
        SLOTS
      </h1>
      <div className="flex justify-center mt-[100px]">
        <div className="flex gap-4 w-[1200px]">
          <div className="grid grid-cols-3 gap-3 bg-transparent bg-white/5 p-4 rounded-[8px]">
            <div className="px-[10px] py-[50px] bg-gradient-to-b from-white/30 via-white to-white/30 rounded-[3px] flex items-center">
              <div>
                <Image
                  src="https://play.zkasino.io/_next/static/media/grug.3d2f545d.png"
                  width={130}
                  height={130}
                  alt="image"
                />
              </div>
            </div>
            <div className="px-[10px] py-[50px] bg-gradient-to-b from-white/30 via-white to-white/30 rounded-[3px] flex items-center">
              <div>
                <Image
                  src="https://play.zkasino.io/_next/static/media/grug.3d2f545d.png"
                  width={130}
                  height={130}
                  alt="image"
                />
              </div>
            </div>
            <div className="px-[10px] py-[50px] bg-gradient-to-b from-white/30 via-white to-white/30 rounded-[3px] flex items-center">
              <div>
                <Image
                  src="https://play.zkasino.io/_next/static/media/grug.3d2f545d.png"
                  width={130}
                  height={130}
                  alt="image"
                />
              </div>
            </div>
          </div>
          <div className="w-[200px]">
            <div className="py-2 px-4 bg-white/5 rounded-[4px]">
              <h1 className="h-small text-white">Wager</h1>
              <div className="flex justify-between bg-[#2A0E23] p-[3px] border-[1px] border-[#2A0E23] hover:border-[#f3d9ae] mt-[5px] rounded-[4px]">
                <h1 className="text-slate-600 font-bold">X</h1>
                <input
                  className="text-slate-600 font-bold w-full text-right text-white bg-transparent border-none focus:outline-none"
                  placeholder="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setWager(Number(e.target.value));
                    setTotalWager(Number(e.target.value) * multiBets);
                  }}
                ></input>
              </div>
              <div></div>
            </div>
            <div className="py-2 px-4 bg-white/5 rounded-[4px] mt-2">
              <div className="flex justify-between">
                <h1 className="text-xs text-white">Multi Bets</h1>
                <div className="flex items-center">
                  <input
                    className="w-[60px] h-[20px] bg-[#2A0E23] border-[1px] border-[#2A0E23] rounded-[4px] hover:border-[#f3d9ae] focus:outline-none font-bold  text-right text-white"
                    onChange={(e) => {
                      setMultiBets(Number(e.target.value));
                      setTotalWager(wager * Number(e.target.value));
                    }}
                    defaultValue={1}
                  />
                </div>
              </div>

              {/* <Slider
                defaultValue={multiBets}
                aria-label="Default"
                valueLabelDisplay="auto"
                color="secondary"
                onChange={(
                  event: Event,
                  value: number,
                  activeThumb: number
                ) => {
                  setMultiBets(value);
                  setTotalWager(wager * value);
                }}
                value={multiBets}
                min={1}
                max={100}
              /> */}

              <div className="flex justify-between">
                <h1 className="text-xs text-white">Stop&nbsp;Gain</h1>
                <input
                  className="w-[100px] h-[20px] bg-[#2A0E23] border-[1px] border-[#2A0E23] rounded-[4px] hover:border-[#f3d9ae] focus:outline-none font-bold text-[11px]  text-right text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setStopGain(Number(e.target.value));
                  }}
                  placeholder="No limit"
                />
              </div>

              <div className="flex justify-between mt-[2px]">
                <h1 className="text-xs text-white">Stop Gain</h1>
                <input
                  className="w-[100px] h-[20px] bg-[#2A0E23] border-[1px] border-[#2A0E23] rounded-[4px] hover:border-[#f3d9ae] focus:outline-none font-bold text-[11px]  text-right text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setStopLoss(Number(e.target.value));
                  }}
                  placeholder="No limit"
                />
              </div>

              <h1 className="text-small text-white">Total Wager</h1>

              <div className="flex justify-between">
                <div></div>
                <h1 className="h-small text-white text-xs font-bold">
                  {totalWager.toFixed(1)}
                </h1>
              </div>
            </div>
            <div className="py-2 px-4 bg-white/5 rounded-[4px] mt-2">
            {isConnected === false ? (
              <div className="text-center text-gray-300 font-bold">Connect First</div>
            ) : (
              approveState === false ? <div className="text-center text-gray-300 font-bold" onClick={ApproveClick}>Approve TUSD</div> : <div className="text-center text-gray-300 font-bold">Play</div>
            )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
