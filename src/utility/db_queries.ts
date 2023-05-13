export const paginated_query = (page: number, itemNo: number): { take?: number; skip?: number } => {
  let query: { take?: number; skip?: number } = {};
  if (page && itemNo) {
    query = { take: itemNo, skip: page * itemNo - itemNo };
  } else if (!page && itemNo) {
    query = { take: itemNo };
  }

  return query;
};
