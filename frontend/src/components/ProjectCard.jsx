export default function ProjectCard({ project }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      marginBottom: "16px",
      borderRadius: "12px"
    }}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <p><b>Tech:</b> {project.techStack}</p>
      <p><b>By:</b> {project.user?.username}</p>

      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank">GitHub</a>
      )}
    </div>
  );
}
