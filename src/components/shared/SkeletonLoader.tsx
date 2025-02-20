import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonLoader = () => {
	return (
		<div className="flex flex-col justify-center items-center h-[calc(100vh-64px)] space-y-4">
			<div className="flex space-x-4">
				<Skeleton variant="rectangular" width={400} height={100} />
				<Skeleton variant="rectangular" width={400} height={100} />
				<Skeleton variant="rectangular" width={400} height={100} />
			</div>

			<div className="flex space-x-4">
				<Skeleton variant="rectangular" width={600} height={150} />
				<Skeleton variant="rectangular" width={600} height={150} />
			</div>

			<div className="space-y-2">
				<Skeleton width={1200} height={30} />
				<Skeleton width={1200} height={30} />
				<Skeleton width={1200} height={30} />
			</div>
			<Skeleton variant="rectangular" width={1200} height={200} />
		</div>
	);
};

export default SkeletonLoader;
