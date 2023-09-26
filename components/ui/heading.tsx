interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <>
      <div className="flex">
        <div className="text-3xl font-bold ">{props.title}</div>
      </div>
      <div className="text-sm font-medium py-2 text-muted-foreground">
        {props.description}
      </div>
    </>
  );
};
