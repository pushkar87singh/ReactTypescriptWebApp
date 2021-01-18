import React from "react";
import { socket } from "../../apollo";
import { styled, Theme } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import HeaderLogo from "../header/HeaderLogo";
import Button from "../button";
import HeaderBar from "../header/header-bar";
import { Card } from "../card";

const Centered = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
});

const ErrorPage = styled(Centered)<Theme>(({ theme }) => ({
  height: "100%",
  background: "#e0e0e0",
  padding: theme.spacing(2),
  boxSizing: "border-box"
}));

const Header = styled(HeaderBar)<Theme>(({ theme }) => ({
  height: theme.layout.headerHeight
}));

const Anchor = styled("a")({
  textDecoration: "none"
});

const Content = styled(Centered)<Theme>(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(0, 2)
}));

const ErrorId = styled("code")<Theme>(({ theme }) => ({
  background: "#e0e0e0",
  borderRadius: 3,
  padding: "5px 10px",
  margin: theme.spacing(1.5, 0)
}));

interface ILogBoundaryState {
  hasError: boolean;
  currentPath: string;
  userId: string;
  errorId: string | null;
}

export class LogBoundary extends React.Component<{}, ILogBoundaryState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      errorId: null,
      currentPath: window.location.pathname,
      userId: ""
    };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    const errorId: string = uuid();

    socket.emit("error-log", {
      uuid: errorId,
      name: error.name,
      desc: error.message.split(`\n`)[0],
      stack: info.componentStack
    });

    this.setState({ hasError: true, errorId });
  }

  public render() {
    const { hasError, errorId } = this.state;

    if (hasError) {
      return (
        <>
          <Header>
            <Anchor href="/">
              <HeaderLogo />
            </Anchor>
          </Header>
          <ErrorPage>
            <Card title="Something went wrong" dark={true}>
              <Centered>
                <Content>
                  If this keeps happening, please contact customer support and
                  reference the code below:
                  <ErrorId>{errorId}</ErrorId>
                </Content>
                <Anchor href="/">
                  <Button>Go Home</Button>
                </Anchor>
              </Centered>
            </Card>
          </ErrorPage>
        </>
      );
    }
    return this.props.children;
  }
}
