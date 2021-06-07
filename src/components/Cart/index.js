import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import styles from "./styles";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Carrt = ({ cart, onUpdateCartQty, onRemoveCart, onEmptyCart }) => {
  const classes = styles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart, start adding some!,
      <Link to="/" className={classes.link}>
        Start adding some
      </Link>
      !
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem onUpdateCartQty={onUpdateCartQty} onRemoveCart={onRemoveCart} item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={onEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (cart.line_items === undefined) return <h3 style={{ marginTop: "5rem" }}>Loading ...</h3>;
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Carrt;
