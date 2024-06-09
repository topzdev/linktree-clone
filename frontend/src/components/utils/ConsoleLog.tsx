import React from "react";

type Props = {
    children?: React.ReactNode,
    data: any
}

const ConsoleLog = ({ data }: Props) => {
    return (
        <pre style={{ textAlign: 'left', backgroundColor: '#f6f8fa', padding: '10px', borderRadius: '5px' }}>
      {JSON.stringify(data, null, 2)}
    </pre>
    );
};

export default ConsoleLog;