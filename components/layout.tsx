import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="p-4 md:p-10 mx-auto max-w-7xl">{children}</main>
    </>
  );
};

export default Layout;
