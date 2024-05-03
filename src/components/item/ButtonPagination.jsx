import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { scrollToTop } from "../../utils/helper";

const ButtonPagination = ({ page, totalPages, setPage }) => {
  const next = () => {
    setPage(page + 1); // Menambahkan halaman satu untuk navigasi ke halaman berikutnya
  };

  const prev = () => {
    if (page === 1) return;
    setPage(page - 1); // Mengurangi satu halaman untuk navigasi ke halaman sebelumnya
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-5">
      <Button
        variant="outlined"
        color="gray"
        className="flex items-center gap-2"
        onClick={() => {prev();scrollToTop()}}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <Button
        variant="outlined"
        color="gray"
        className="flex items-center gap-2"
        onClick={()=>{next();scrollToTop()}}
        disabled={page === totalPages}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ButtonPagination;
