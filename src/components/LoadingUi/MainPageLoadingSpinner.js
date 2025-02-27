const MainLoadingSpinner = () => {
  return (
    <div className='mx-auto flex items-center justify-center   w-screen h-screen'>
      <div
        className='   h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] '
        role='status'
      ></div>
    </div>
  );
};

export default MainLoadingSpinner;
