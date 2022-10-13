interface IProps{
    children: string
}

export const Title: React.FC<IProps> = ({ children }) => 
    <div className="title">{children}</div>;

