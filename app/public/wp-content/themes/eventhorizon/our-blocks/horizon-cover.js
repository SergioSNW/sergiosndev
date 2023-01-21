import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("eventhorizontheme/rainbow-title", {
    title: "Rainbow Title",
    attributes: {
        text: {type: "string"},
        size: {type: "string", default: "large"}
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
            <RichText allowedFormats={["core/bold", "core/italic"]} tagName="h1" className={`headline headline--${props.attributes.size} rainbow-text`} value={props.attributes.text} onChange={handleTextChange} />
        </>
    )
}