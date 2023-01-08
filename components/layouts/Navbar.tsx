/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import style from "../../styles/Navbar.module.css";

export const Navbar: FC = () => {
  return (
    <div className="w-full h-200 z-[100] bg-transparent">
      <div className="flex justify-center w-full h-full 2xl:px-16 justify-self-center">
        <div className={style.section}>
          <img
            className="cursor-pointer justify-self-center"
            src="/assets/StarknetIdLogo.png"
            alt="Starknet.id Logo"
            width={90}
            height={90}
          />
        </div>
      </div>
    </div>
  );
};