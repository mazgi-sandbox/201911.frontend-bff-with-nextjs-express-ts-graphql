import {
  Button,
  Checkbox,
  Grid,
  GridList,
  GridListTile,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import React, { useState } from 'react'
import NextLink from 'next/link'
import Router from 'next/router'
import fetchGraphQLData from 'lib/graphql/request'
import gql from 'graphql-tag'
import useForm from 'react-hook-form'

type Props = {
  items: {
    id: string
    data?: string
  }[]
}

const readImageToUpload = (file: File): Promise<string> => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onerror = (): void => {
      reader.abort()
      reject(new DOMException('Cannot parse the file.'))
    }
    reader.onload = (): void => {
      let result = reader.result
      if (result instanceof ArrayBuffer) {
        result = String.fromCharCode.apply(null, new Uint8Array(result))
      }
      resolve(result as string)
    }
    reader.readAsDataURL(file)
  })
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none'
    }
  })
)

const Component: React.FC<Props> = (props: Props) => {
  const { items } = props
  const classes = useStyles('')
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data): Promise<void> => {
    const { images } = data
    if (!images) {
      console.log(`cannot read image.`)
    }
    const image = images[0]
    console.log(`upload a image: `, image)
    const imageURL = await readImageToUpload(image)
    const imageData = imageURL.replace(/^data:image\/.*;base64,/, '')
    const query = gql`
      mutation {
        uploadImage(
          data: "${imageData}"
        ) {
          id
        }
      }
    `
    console.log(`query: `, query)
    await fetchGraphQLData(query, 'uploadImage')
      .then(image => {
        console.log(`uploadImage: `, image)
        //TODO: show upload result
        return image
      })
      .catch(reason => {
        console.log(`reason: `, reason)
      })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <NextLink href="#">reload</NextLink>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="images"
            name="images"
            className={classes.input}
            inputProps={{ accept: 'image/jpeg', type: 'file' }}
            inputRef={register}
          />
          <label htmlFor="images">
            <Button variant="contained" color="primary" component="span">
              choose a image
            </Button>
          </label>
          <Button type="submit" color="primary" variant="contained">
            upload
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <GridList>
            {items.map(image => (
              <GridListTile key={image.id}>
                <div>foo</div>
                <img
                  src={`data:image/jpeg;base64,${image.data}`}
                  alt={image.id}
                />
              </GridListTile>
            ))}
          </GridList>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Component
