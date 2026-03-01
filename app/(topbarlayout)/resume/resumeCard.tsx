import React from "react";
import Image from "next/image";

interface ResumeCardProps {
  title: string;
  role?: string;
  imageSrc?: string;
  imageAltText?: string;
  children: React.ReactNode;
  roundImg: boolean;
  date?: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  role,
  imageSrc,
  imageAltText,
  children,
  roundImg,
  date,
}) => {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-2 mb-2">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="m-0 lg:m-0">{title}</h3>
          {role && (
            <div className="text-sm font-medium text-gray-700">{role}</div>
          )}
          {date && <div className="text-sm text-gray-600">{date}</div>}
        </div>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAltText}
            width={100}
            height={100}
            className={`m-0 h-[50px] w-[50px] lg:h-[100px] lg:w-[100px] ${
              roundImg ? "rounded-full" : ""
            }`}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default ResumeCard;
