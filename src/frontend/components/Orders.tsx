import React, { useState, FC, ReactElement } from "react";
import { Box, Label, Input } from "@adminjs/design-system";
import { margin } from "../styles";
import { ShowPropertyProps } from "adminjs";

const Orders: FC<ShowPropertyProps> = ({ record }): ReactElement => {
  const [order, setOrder] = useState(record.params.orders ? record.params.orders : "");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOrder(e.target.value);
    record.params.orders = e.target.value;
  };

  return (
    <Box>
      <Label>Orders</Label>
      <Input width={1} style={margin(0, 0, 2, 0, "rem")} type="number" min="0" name="orders" value={order} onChange={changeHandler} />
    </Box>
  );
};

export default Orders;
