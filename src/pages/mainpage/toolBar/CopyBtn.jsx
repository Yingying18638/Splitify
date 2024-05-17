import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link as LinkIcon } from "lucide-react";
import React from "react";

const CopyBtn = ({isUrlCopied, handleCopyUrl}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary" onClick={handleCopyUrl}>
          <LinkIcon id="copyLink" className="w-5  mx-1 " strokeWidth={2.5} />
          邀請連結
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px]">
        {isUrlCopied ? "連結已複製" : ""}
      </PopoverContent>
    </Popover>
  );
};

export default CopyBtn;
