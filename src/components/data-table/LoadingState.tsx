import { Column } from "./types";
import { SkeletonRow } from "./SkeletonRow";

const LoadingState = <T,>({
  columns,
  loadingRows,
}: {
  columns: Column<T>[];
  loadingRows: number;
}) => {
  return (
    <>
      {Array.from({ length: loadingRows }).map((_, i) => (
        <SkeletonRow key={i} columns={columns.length} />
      ))}
    </>
  );
};

export default LoadingState;
