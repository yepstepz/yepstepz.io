import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import { css, Global } from "@emotion/core"

import { reset } from "../styles/reset"
import { Wrapper } from "../styles/layout"
import { Header } from '../components/header'
import { TwoColumnsText } from "../components/partials";

class Homepage extends Component {
    render() {
        const data = this.props.data

        return (
            <>
                <Header/>
                <Wrapper>
                    <h1>Привет!</h1>
                    <TwoColumnsText>
                        Нужно тебе быстро постирать вещи смешанного типа? Вот тебе режим 30&nbsp;градусов-30&nbsp;минут. Нежные деликатные ткани, но&nbsp;чтобы нормально отстирались все пятна? Вот те&nbsp;же 30&nbsp;градусов, но&nbsp;с&nbsp;большей продолжительностью стирки. Цветные деликатные ткани, какая-нибудь шерсть, джинсы? На&nbsp;40&nbsp;градусов. Нужно отстирать винчик пролитый на&nbsp;белую футболку вчера на&nbsp;вечеринке? Или жирные пятна на&nbsp;джинсах после похода в&nbsp;местную шаверму? Вот тебе 60&nbsp;градусов. А&nbsp;нужно&nbsp;ли что-то ещё?
                        Здесь огромные варианты выбора всевозможных режимов, не&nbsp;совсем понятные иконки, а&nbsp;линии&nbsp;&mdash; сложно сопоставить с&nbsp;текстом, к&nbsp;которому они относятся. Очевидно, что перед каждой стиркой будешь тратить как минимум пару минут, чтобы разобраться куда подвинуть регулятор, а&nbsp;мне, как человеку сильно уважающему своё время&nbsp;&mdash; жалко тратить его на&nbsp;простейшие бытовые процессы.
                    </TwoColumnsText>
                    {data.allWordpressPost.edges.map(({ node }) => (
                        <ul>
                            <li>
                                <Link to={node.slug}>
                                    <h2>{node.title}</h2>
                                </Link>
                                <div dangerouslySetInnerHTML={{__html: node.excerpt}}/>
                            </li>
                        </ul>
                    ))}
                </Wrapper>
            </>
        )
    }
}

export default Homepage

export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`
