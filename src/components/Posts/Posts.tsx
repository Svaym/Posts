import axios from "axios";
import { FC, useEffect, useState } from "react";
import classes from '../Posts/_Posts.module.scss';
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { increment } from "../../Redux/features/like/likeSlice";

const Posts: FC = () => {
  //  модальное окно
  const [isOpenModal, setIsOpenModal] = useState(false)
  //  Счётчик лайков
  const [counter, setCounter] = useState(0)
  const Counter: FC = () => {
    const like = useAppSelector(state => state.like.value)
    const dispatch = useAppDispatch()
  }
  //  Функция для удаления постов
  type RemovePost = (title: string) => void
  const removePost: RemovePost = (title) => {
    setPosts(posts.filter((item) => item.title !== title))
  }
  //  Посты
  interface Post{
    id: number;
    title: string;
    body: string;
    // like: number;
  }
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchPosts = async() => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(response.data)
    }
    fetchPosts()
  }, [])
  return (
    <section className={classes.posts}>
      <div className="container">
        <h1 className={classes['posts__title--main']}>
          Posts
        </h1>
        <div className={classes['posts-list']}>
          {posts.map((item, id) => (
            <div className={classes.posts__card} key={id}>
              <button onClick={() => removePost(item.title)} className={classes.posts__btn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classes.posts__delete}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
              <h1 className={classes.posts__title}>
                {item.title}
              </h1>
              <p className={classes.posts__desc}>
                {item.body}
              </p>
              <div className={classes['posts__count']}>
                <button onClick={() => {setCounter(counter + 1); dispatch(increment())}} className={classes.posts__btn}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classes.posts__heart}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
                {counter !== 0 && (
                  <h3 className={classes.posts__like}>
                    {counter}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
export default Posts