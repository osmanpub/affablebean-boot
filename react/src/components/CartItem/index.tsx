import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getId } from "../../helpers/utils";
import { CartItem as CartItemState } from "../../interfaces/cart";
import { updateProductInCart } from "../../net/cart";
import { CartTableTd } from "./CartItem.styles";

type FormData = {
  quantity: number;
};

type Props = {
  index: number;
  item: CartItemState;
};

export default function CartItem(props: Props) {
  const { index, item } = props;
  const { product } = item;
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(({ quantity }) => {
    dispatch(updateProductInCart(getId(product), quantity));
  });

  const name = product.name;
  const rowCol = index % 2 === 0 ? "white" : "lightBlue";

  return (
    <>
      <tr className={`${rowCol}`} data-cy={`product-${name}`}>
        <CartTableTd>
          <img src={`/static/img/products/${name}.png`} alt={name} />
        </CartTableTd>
        <CartTableTd data-testid={name}>{name}</CartTableTd>
        <CartTableTd data-testid={product.price}>
          &euro;
          {item.total.toFixed(2)}
          <br />
          {product.price}
        </CartTableTd>
        <CartTableTd>
          <form onSubmit={onSubmit}>
            <input
              className="form-control"
              data-cy={`input-qty-${name}`}
              defaultValue={item.quantity}
              name="quantity"
              ref={register({ required: true, min: 0, max: 100 })}
              size={2}
              style={{ margin: "5px", textAlign: "center", width: "90%" }}
              type="number"
            />
            <button
              className="btn btn-primary btn-sm"
              data-cy={`update-qty-${name}`}
              type="submit"
            >
              update
            </button>
            {errors.quantity && (
              <div className="formError">
                Enter a quantity between 0 and 100
              </div>
            )}
          </form>
        </CartTableTd>
      </tr>
    </>
  );
}
