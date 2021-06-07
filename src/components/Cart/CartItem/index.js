import React from "react";
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@material-ui/core";

import styles from "./styles";

const CartItem = ({ item, onUpdateCartQty, onRemoveCart }) => {
    const classes = styles();
    return (
        <Card>
            <CardMedia
                image={item.media.source}
                alt={item.name}
                className={classes.media}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4"> {item.name}</Typography>
                <Typography variant="h5">
                    {" "}
                    {item.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button
                        type="button"
                        size="small"
                        onClick={() =>
                            onUpdateCartQty(item.id, item.quantity - 1)
                        }
                    >
                        -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                        type="button"
                        size="small"
                        onClick={() =>
                            onUpdateCartQty(item.id, item.quantity + 1)
                        }
                    >
                        +
                    </Button>
                </div>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => onRemoveCart(item.id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
