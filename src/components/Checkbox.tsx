"use client";

import React from "react";
import IconChecked from "./IconChecked";

type TCheckboxProps = {
  id?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"input">;

export default function Checkbox(props: TCheckboxProps) {
  const { id, children, checked, onChange, ...restProps } = props;

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="hidden peer"
        checked={checked}
        onChange={onChange}
        {...restProps}
      />
      <label
        htmlFor={id}
        className="w-4 h-4 border-[1px] rounded cursor-pointer flex items-center justify-center border-gray-400 peer-checked:bg-navy-900 peer-checked:border-navy-900"
      >
        <IconChecked />
      </label>
      {children && (
        <label htmlFor={id} className="ml-1 cursor-pointer">
          {children}
        </label>
      )}
    </div>
  );
}
