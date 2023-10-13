import bg from '../../../assets/img/bg-1.gif';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="h-screen bg-cover bg-left bg-no-repeat font-display sm:bg-center"
      >
        <main className="flex flex-col items-center">{children}</main>
      </div>
    </>
  );
};

export default Container;
