import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../container/Container";
import { Logo, LogOutBtn } from "../index.js";
import { Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header>
      <Container>
        <nav className="flex justify-between align-middle">
          <div className="text-4xl font-bold">
            <Link to="/">
              <Logo></Logo>
            </Link>
          </div>
          <div className="flex gap-20 text-xl justify-center items-center">
            <ul className="text-white flex gap-10">
              {navItems.map((item) => {
                return (
                  item.active && (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)}>{item.name}</button>
                    </li>
                  )
                );
              })}
            </ul>
            {authStatus && (
              <LogOutBtn></LogOutBtn>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
