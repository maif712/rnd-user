
// User formating date helper function.
export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};


export const truncateId = (fullId: string) => {
    return fullId.split("-")[0] + "…";
  };