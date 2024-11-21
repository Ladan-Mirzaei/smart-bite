const [newPost, setNewPost] = useState({ title: "", body: "" });
const { data, isLoading, error, refetch } = useFetch(
  "https://jsonplaceholder.typicode.com/posts",
  "POST",
  newPost
);

const handleSubmit = (e) => {
  e.preventDefault();
  refetch(); // Send POST request
};
