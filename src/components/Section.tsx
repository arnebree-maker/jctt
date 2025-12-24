import React from "react";

export function Section(props: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={props.id} className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {props.title && (
          <div className="mb-8 md:mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{props.title}</h2>
            {props.subtitle && (
              <p className="mt-3 text-base md:text-lg text-gray-600">{props.subtitle}</p>
            )}
            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-jcttRed" />
          </div>
        )}
        {props.children}
      </div>
    </section>
  );
}
