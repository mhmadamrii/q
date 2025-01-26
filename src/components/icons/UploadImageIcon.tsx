import React from "react";

export const UploadImageIcon = React.memo(
  ({
    className = "",
    isActive,
  }: {
    className?: string;
    isActive?: boolean;
  }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <defs>
          <path id="a" d="M5 4.5v14H2V.5h16.5v4z"></path>
        </defs>
        <g fill="#fff" fillRule="evenodd" className="icon_svg-fill_as_stroke">
          <g fillRule="nonzero">
            <path d="M8 7a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-12A.5.5 0 0 0 20 7zm0-1.25h12a1.75 1.75 0 0 1 1.75 1.75v12A1.75 1.75 0 0 1 20 21.25H8a1.75 1.75 0 0 1-1.75-1.75v-12A1.75 1.75 0 0 1 8 5.75M17.5 9a1 1 0 1 0 0 2 1 1 0 1 0 0-2m0-1.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 1 1 0-4.5"></path>
            <path d="M7.511 16.316V20h13v-3.682q-2.595-1.389-3.241-1.389c-.647 0-2.606 1.388-3.257 1.389s-2.609-2.299-3.252-2.299q-.643 0-3.25 2.298zm6.674-1.353.867-.443c1.296-.69 1.629-.842 2.217-.842.732 0 1.874.489 3.831 1.537a1.25 1.25 0 0 1 .66 1.102V20a1.25 1.25 0 0 1-1.25 1.25h-13A1.25 1.25 0 0 1 6.261 20v-3.684a1.25 1.25 0 0 1 .423-.938c2.065-1.82 3.183-2.61 4.077-2.61.523 0 .911.21 1.443.613.271.205.489.392 1.007.849l.866.732.041.031z"></path>
          </g>
          <mask id="b" fill="#fff">
            <use xlinkHref="#a"></use>
          </mask>
          <path
            fillRule="nonzero"
            d="M4.5 3.5A.5.5 0 0 0 4 4v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zm0-1.25h12A1.75 1.75 0 0 1 18.25 4v12a1.75 1.75 0 0 1-1.75 1.75h-12A1.75 1.75 0 0 1 2.75 16V4A1.75 1.75 0 0 1 4.5 2.25"
            mask="url(#b)"
          ></path>
        </g>
      </svg>
    );
  },
);
