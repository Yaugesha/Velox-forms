import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/documents/Header";

function Main() {
  return (
    <>
      <Header isAuthorized={false} page={"Main"} />
      <main>
        <Outlet />
        <section className="w-[980px] mt-10 mb-[72px] flex flex-col items-center gap-y-[72px]">
          <h2 className="text-2xl">
            The original online Free PDF editor & form filler.
          </h2>
          <div className="w-[880px] flex justify-between">
            <div className="h-48 w-64 flex flex-col gap-10 pt-2.5 justify-around items-center border-2 border-black">
              <img
                src="src/client/assets/icons/documents/icon-doc-add.svg"
                alt="add document"
              />
              <span>Create new document</span>
            </div>
            <div className="h-48 w-64 flex flex-col gap-10 pt-2.5 justify-around items-center border-2 border-black">
              <img
                src="src/client/assets/icons/documents/icon-doc-import.svg"
                alt="upload document"
              />
              <span>Upload your own document</span>
            </div>
            <div className="h-48 w-64 flex flex-col gap-10 pt-2.5 justify-around items-center border-2 border-black">
              <img
                src="src/client/assets/icons/documents/icon-doc-search.svg"
                alt="find template"
              />
              <span>Find a template with us</span>
            </div>
          </div>
        </section>
        <section className="w-[980px] flex flex-col items-center">
          <img src="src/client/assets/icons/logo/logo-main.png" alt="Logo" />
          <h2 className="text-xl font-bold mt-4 mb-12">
            The easiest way to fill forms online
          </h2>
          <div className="w-[880px] flex flex-wrap justify-between gap-y-12">
            <div className="w-[264px] h-[290px] flex flex-col items-start pt-[8px] pr-[40px] pb-[26px] pl-[15px]">
              <img
                className=" mb-[18px]"
                src="src/client/assets/icons/description/clock.svg"
                alt="clock"
              />
              <h3 className="font-bold">Quickly fill out Forms</h3>
              <p className="w-[208px]">
                Looking for a way to quickly fill forms online? Look no further
                than Velox Forms! With our online free form filler, you'll know
                how to how to edit a pdf document in less than a minute.
              </p>
            </div>
            <div className="w-[264px] h-[290px] flex flex-col items-start pt-[8px] pr-[40px] pb-[26px] pl-[15px]">
              <img
                className=" mb-[18px]"
                src="src/client/assets/icons/description/like.svg"
                alt="like"
              />
              <h3 className="font-bold">Easy to use online editor</h3>
              <p className="w-[208px]">
                Fed up with printing out files so you can edit them, before
                rescanning and sending them back? Edit documents for free
                online. Use Velox Forms's online editor to save time and paper.
              </p>
            </div>
            <div className="w-[264px] h-[290px] flex flex-col items-start pt-[8px] pr-[40px] pb-[26px] pl-[15px]">
              <img
                className=" mb-[18px]"
                src="src/client/assets/icons/description/accurate.svg"
                alt="accurate"
              />
              <h3 className="font-bold">Great tools, all platforms</h3>
              <p className="w-[208px]">
                Wondering how to fill in a form on a Mac, or maybe how to use
                filler free? Velox Forms's online tools work on all platforms,
                and you can edit unlimited number of files for free.
              </p>
            </div>
            <div className="w-[264px] h-[290px] flex flex-col items-start pt-[8px] pr-[40px] pb-[26px] pl-[15px]">
              <img
                className=" mb-[18px]"
                src="src/client/assets/icons/description/security.svg"
                alt="security"
              />
              <h3 className="font-bold">Secure upload and file storage</h3>
              <p className="w-[208px]">
                All file uploading is encrypted via HTTPS to safeguard your
                content. Files are stored in a secured database. You can delete
                your files from our system anytime.
              </p>
            </div>
            <div className="w-[264px] h-[290px] flex flex-col items-start pt-[8px] pr-[40px] pb-[26px] pl-[15px]">
              <img
                className=" mb-[18px]"
                src="src/client/assets/icons/description/computer.svg"
                alt="computer"
              />
              <h3 className="font-bold">Access files from anywhere</h3>
              <p className="w-[208px]">
                Velox Forms is an online service and is accessible via any
                device connected to the internet. You can access your file from
                your home, the office or anywhere else.
              </p>
            </div>
            <div className="w-[264px] h-[290px] flex flex-col items-start pt-[8px] pr-[40px] pb-[26px] pl-[15px]">
              <img
                className=" mb-[18px]"
                src="src/client/assets/icons/description/uptodate.svg"
                alt="uptodate"
              />
              <h3 className="font-bold">Always up to date</h3>
              <p className="w-[208px]">
                Velox Forms is on the cloud, so whenever you access the site,
                you're accessing the latest version of the software. No lengthy
                updates - or software downloads - required.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Main;
