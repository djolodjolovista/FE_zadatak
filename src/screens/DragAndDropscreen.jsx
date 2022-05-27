import * as React from 'react';
import { Card, Typography } from '@mui/material';
import GridLayout from "react-grid-layout";



const DragAndDropscreen = () => {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 0, y: 1, w: 1, h: 2 },
        { i: "c", x: 0, y: 2, w: 1, h: 2 },
        { i: "d", x: 0, y: 3, w: 1, h: 2 }
      ];
    return (
        <GridLayout
          className="layout"
          layout={layout}
          cols={2}
          rowHeight={30}
          width={1280}
        >
          <div style={{backgroundColor: "blue", color:"red"}} key="a">Prvi projekat</div>
          <div style={{backgroundColor: "blue", color:"red"}} key="b">Drugi projekat</div>
          <div style={{backgroundColor: "blue", color:"red"}} key="c">Treci projekat</div>
          <Card style={{backgroundColor: "blue", color:"red"}} key="d"><Typography>Cetvrti projekat</Typography></Card>
        </GridLayout>
      );
};

export default DragAndDropscreen;
