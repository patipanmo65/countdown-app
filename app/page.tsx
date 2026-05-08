"use client";

import { useEffect, useState } from "react";
import { Play, RotateCcw, Pencil, Maximize, Pause } from "lucide-react";

export default function CountdownPage() {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(0);

  // ค่าเวลาเริ่มต้น
  const initialTime = hours * 3600 + minutes * 60 + seconds;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [running, setRunning] = useState(false);

  // Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // หมดเวลา
    if (timeLeft <= 0 && running) {
      setRunning(false);
      setTimeLeft(0);
      alert("หมดเวลาแล้วจ้า");
    }

    return () => clearInterval(timer);
  }, [running, timeLeft]);

  // Format Time
  const format = (num: number) => {
    return String(num).padStart(2, "0");
  };

  // Display Time
  const displayHours = Math.floor(timeLeft / 3600);
  const displayMinutes = Math.floor((timeLeft % 3600) / 60);
  const displaySeconds = timeLeft % 60;

  // Start / Resume
  const startTimer = () => {
    // ถ้ายังไม่มีเวลา ให้ใช้ค่าจาก input
    if (timeLeft <= 0) {
      setTimeLeft(initialTime);
    }

    setRunning(true);
  };

  // Pause
  const stopTimer = () => {
    setRunning(false);
  };

  // Reset
  const cancelTimer = () => {
    setRunning(false);
    setTimeLeft(initialTime);
  };

  // Add 1 Minute
  const addMinute = () => {
    setTimeLeft((prev) => prev + 60);
  };

  // Fullscreen
  const fullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center px-6 py-8">
      {/* Title */}
      <h1 className="text-6xl font-bold text-[#0d1b2a] mb-8">จับเวลาถอยหลัง</h1>

      <div className="w-full max-w-6xl border-t-4 border-gray-300 pt-10">
        {/* Timer Box */}
        <div className="bg-[#dcdcdc] rounded-3xl p-10 flex items-center justify-center gap-10">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1d1d1d] text-white px-5 py-3 rounded-md relative mb-4 text-2xl font-bold">
              ชม.
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-[#1d1d1d] rotate-45"></div>
            </div>

            <input
              type="number"
              min={0}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-[220px] h-[180px] text-center text-[110px] bg-white border border-gray-400 rounded-sm outline-none"
            />
          </div>

          {/* Colon */}
          <div className="text-[100px] font-light text-gray-500 mt-20">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1d1d1d] text-white px-5 py-3 rounded-md relative mb-4 text-2xl font-bold">
              น.
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-[#1d1d1d] rotate-45"></div>
            </div>

            <input
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(Math.min(59, Number(e.target.value)))}
              className="w-[220px] h-[180px] text-center text-[110px] bg-white border border-gray-400 rounded-sm outline-none"
            />
          </div>

          {/* Colon */}
          <div className="text-[100px] font-light text-gray-500 mt-20">:</div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1d1d1d] text-white px-5 py-3 rounded-md relative mb-4 text-2xl font-bold">
              ว.
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-[#1d1d1d] rotate-45"></div>
            </div>

            <input
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(Math.min(59, Number(e.target.value)))}
              className="w-[220px] h-[180px] text-center text-[110px] bg-white border border-gray-400 rounded-sm outline-none"
            />
          </div>
        </div>

        {/* Time Display */}
        <div className="text-center text-8xl font-bold mt-10 text-[#111]">
          {format(displayHours)}:{format(displayMinutes)}:
          {format(displaySeconds)}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          {/* Start */}
          <button
            onClick={startTimer}
            className="w-[250px] h-[90px] bg-[#1d6df2] hover:bg-[#1358ca] text-white rounded-xl text-4xl font-bold flex items-center justify-center gap-4"
          >
            <Play size={38} />
            เริ่มต้น
          </button>

          {/* Pause */}
          <button
            onClick={stopTimer}
            className="w-[250px] h-[90px] bg-[#f0ad4e] hover:bg-[#d99637] text-white rounded-xl text-4xl font-bold flex items-center justify-center gap-4"
          >
            <Pause size={38} />
            หยุด
          </button>

          {/* Reset */}
          <button
            onClick={cancelTimer}
            className="w-[250px] h-[90px] bg-[#dc3545] hover:bg-[#bb2d3b] text-white rounded-xl text-4xl font-bold flex items-center justify-center gap-4"
          >
            <RotateCcw size={38} />
            ยกเลิก
          </button>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-16">
          {/* Fullscreen */}
          <button
            onClick={fullscreen}
            className="border border-gray-400 bg-white px-8 py-4 rounded-lg text-2xl text-gray-600 flex items-center gap-3 hover:bg-gray-100"
          >
            <Maximize size={24} />
            เต็มจอ
          </button>

          {/* Edit */}
          <button className="border border-gray-400 bg-white px-8 py-4 rounded-lg text-2xl text-gray-600 flex items-center gap-3 hover:bg-gray-100">
            <Pencil size={24} />
            แก้ไขชื่อ
          </button>

          {/* +1 Minute */}
          <button
            onClick={addMinute}
            className="border border-gray-400 bg-white px-8 py-4 rounded-lg text-2xl text-gray-600 hover:bg-gray-100"
          >
            +1:00
          </button>
        </div>

        {/* Hint */}
        <div className="text-center text-gray-500 text-2xl mt-12">
          คลิกที่ตัวเลขเพื่อปรับค่าเวลา
        </div>
      </div>
    </div>
  );
}
