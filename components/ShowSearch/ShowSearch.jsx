import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ShowSearch({
  searchText,
  setSearchText,
  hadleSearchInput,
  setOpenSearch,
  openSearch,
}) {
  return (
    <>
      {/* Modal content */}
      <div className="fixed z-20 bottom-[4.7rem] left-0 w-full px-6 py-3 border bg-background">
        <div className="flex items-center justify-between gap-2">
          <div className="w-full flex items-center z-20">
            <form onSubmit={hadleSearchInput} className="w-full">
              <Input
                ref={(input) => input && input.focus()}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                name="search"
                type="text"
                placeholder={`Search user, notes, keywords...`}
                className={`font-bold px-4 py-5 rounded-lg text-base bg-background`}
              />
            </form>
            <Button
              size="icon"
              className={`h-[2.69rem] w-12 ml-2 rounded-lg`}
              onClick={() => {
                setOpenSearch(!openSearch);
                setSearchText("");
              }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
