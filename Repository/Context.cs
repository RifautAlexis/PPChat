using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PPChat.Models;

namespace PPChat.Repository {
    public class Context : DbContext {

        public DbSet<User> Users { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<Message> Messages { get; set; }

        public Context (DbContextOptions<Context> options) : base (options) { }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            // configures self one-to-many relationship / Users
            modelBuilder.Entity<User> ()
                .HasOne (u => u.LinkedToContact)
                .WithMany (u => u.Contacts)
                .HasForeignKey (u => u.Id);

            // configures many-to-many relationship through SpeakersThreads / Users - SpeakersThreads - Threads
            modelBuilder.Entity<SpeakersThreads> ()
                .HasKey (st => new { st.SpeakerId, st.ThreadId });

            modelBuilder.Entity<SpeakersThreads> ()
                .HasOne (st => st.Speaker)
                .WithMany (u => u.Threads)
                .HasForeignKey (st => st.SpeakerId);

            modelBuilder.Entity<SpeakersThreads> ()
                .HasOne (st => st.Thread)
                .WithMany (t => t.Speakers)
                .HasForeignKey (st => st.ThreadId);

            // configures one-to-many relationship through SpeakersThreads / Users - Messages (sender in Message)
            modelBuilder.Entity<User>()
                .HasMany<Message>(u => u.Messages)
                .WithOne(m => m.Sender);

            // configures One-to-many relationship through SpeakersThreads / Threads - Messages
            modelBuilder.Entity<Thread>()
                .HasMany<Message>(t => t.Messages)
                .WithOne(m => m.Thread);
        
        }
    }

}