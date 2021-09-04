import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js"; 
import { request } from "./api/api.js";

export default function App($app){
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
    }
    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth
    })

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedNodeImage
    })

    const nodes = new Nodes({
        $app,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        onClick: async (node) => {
            try{
                if(node.type ==="DIRECTORY"){
                    const nextNodes = await request(node.id)
                    this.setState({
                        ...this.state,
                        depth: [...this.state.depth, node],
                        nodes: nextNodes
                    })
                }else if (node.type === "FILE"){
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath
                    })
                }
            }catch (error){
                throw new Error(error)
            }
        },

        onBackClick: async () => {
            try{
                const nextState = {...this.state}
                nextState.depth.pop()

                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length = 1].id
                
                if(prevNodeId === null){
                    const rootNodes = await request();
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: rootNodes,
                    })
                }else{
                    const prevNodes = await request(prevNodeId)
                    this.setState({
                        ...nextNodes,
                        isRoot:false,
                        nodes: prevNodes
                    })
                }
            }catch (error){
                throw new Error(error)
            }
        }
    })
    this.setState = (nextState) => {
        this.state = nextState
        breadcrumb.setState(this.state.depth)
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        imageView.setState(this.state.selectedFilePath)
    }
}