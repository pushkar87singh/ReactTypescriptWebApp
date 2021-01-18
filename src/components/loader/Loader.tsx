import React from "react";
import { CircularProgress, Box, makeStyles } from "@material-ui/core";
import SnackBar from "../snackbar";
import { ApolloError } from "apollo-boost";

interface ILoaderProps<T> {
  className?: string;
  loading?: boolean;
  error?: ApolloError;
  errorMessage: string;
  data?: T;
  loaderComponent?: React.ReactNode;
}

type RenderFn<T> = (data: T) => React.ReactNode;

// Defaults to page height
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${theme.layout.headerHeight}px )`
  }
}));

const Loader = <T extends object>({
  className,
  loading,
  error,
  errorMessage,
  data,
  loaderComponent,
  children
}: ILoaderProps<T> & { children: RenderFn<T> }) => {
  const classes = useStyles({});
  return (
    <>
      {loading || error || !data
        ? loaderComponent || (
            <Box
              data-testid="loader-element"
              className={className || classes.root}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="inherit"
            >
              <CircularProgress
                size={96}
                thickness={4}
                color="primary"
                variant="indeterminate"
              />
            </Box>
          )
        : children(data)}
      <SnackBar
        data-testid="loader-error"
        open={!!error}
        message={errorMessage}
        variant="error"
      />
    </>
  );
};

export default Loader;
