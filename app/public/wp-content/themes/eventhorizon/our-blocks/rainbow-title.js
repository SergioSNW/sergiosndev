import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("eventhorizontheme/rainbow-title", {
    title: "Rainbow Title",
    supports: {
        align: true
    },
    attributes: {
        text: {type: "string"},
        size: {type: "string", default: "large"},
        align: {type: "string", default: "center"}
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {
    function handleTextChange(x) {
        props.setAttributes({ text: x })
    }

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton isPressed={props.attributes.size === "large"} onClick={() => props.setAttributes({ size: "large" })}>
                        Large
                    </ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={() => props.setAttributes({ size: "medium" })}>
                        Medium
                    </ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "small"} onClick={() => props.setAttributes({ size: "small" })}>
                        Small
                    </ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "xsmall"} onClick={() => props.setAttributes({ size: "xsmall" })}>
                        XSmall
                    </ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <RichText tagName="h1" position={props.attributes.align} className={`headline headline--${props.attributes.size} rainbow-text`} value={props.attributes.text} onChange={handleTextChange} />
        </>
    )
}

function SaveComponent(props) {
    function createTagName() {
        switch(props.attributes.size) {
            case "large":
                return "h1"
            case "medium":
                return "h2"
            case "small":
                return "h3"
            case "xsmall":
                return "h4"
        }
    }

    return (
        <RichText.Content position={props.attributes.align} tagName={createTagName()} value={props.attributes.text} className={`headline headline--${props.attributes.size} rainbow-text`} />
    )
}
