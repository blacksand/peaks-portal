export default function Loading() {
  return (
    <div className="fixed h-screen w-screen bg-blue-200">
      <div className="flex size-full items-center justify-center">
        {/* <LoadingSpinner /> */}
        <div className="animate-pulse">
          载入中...
        </div>
      </div>
    </div>
  )
}
