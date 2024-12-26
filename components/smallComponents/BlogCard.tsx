import React from "react";

const BlogCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BlogCard({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`
                flex gap-3 rounded-xl shadow-sm p-5 max-w-[500px] items-start border border-zinc-100 flex-row hover:bg-furix-violet hover:text-white transition-all duration-300 cursor-pointer group h-34
                ${className ? className : ""}
            `}
      {...props}
    />
  );
});

const BlogSideIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BlogCard({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex flex-grow-0 p-3 rounded-full bg-red-100 group-hover:bg-white text-furix-red flex-shrink ${
        className ? className : ""
      }
        `}
      {...props}
    />
  );
});

const BlogSideContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BlogCard({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex-grow flex flex-col gap-1 ${className ? className : ""}`}
      {...props}
    />
  );
});

const BlogTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BlogCard({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`text-md md:text-lg font-bold font-geist-sans py-3 flex justify-between ${
        className ? className : ""
      }
        `}
      {...props}
    />
  );
});

const BlogDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BlogCard({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={`text-xs w-full text-wrap font-poppins ${
        className ? className : ""
      }
        `}
      {...props}
    />
  );
});

export { BlogCard, BlogTitle, BlogDescription, BlogSideContent, BlogSideIcon };
